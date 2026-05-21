import zipfile
import xml.etree.ElementTree as ET
import os

def read_xlsx(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    try:
        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            # Read shared strings
            shared_strings = []
            try:
                with zip_ref.open('xl/sharedStrings.xml') as f:
                    tree = ET.parse(f)
                    root = tree.getroot()
                    for si in root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                        t = si.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
                        if t is not None:
                            shared_strings.append(t.text)
                        else:
                            # Handle rich text
                            text_parts = []
                            for r in si.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}r'):
                                rt = r.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
                                if rt is not None and rt.text:
                                    text_parts.append(rt.text)
                            shared_strings.append("".join(text_parts))
            except KeyError:
                pass # No shared strings

            # Read sheet1
            with zip_ref.open('xl/worksheets/sheet1.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()
                sheet_data = root.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData')
                
                for row in sheet_data.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
                    row_data = []
                    for cell in row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                        v = cell.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                        if v is not None:
                            t = cell.get('t')
                            if t == 's': # Shared string
                                idx = int(v.text)
                                row_data.append(shared_strings[idx] if idx < len(shared_strings) else v.text)
                            else:
                                row_data.append(v.text)
                        else:
                            row_data.append("")
                    print("\t".join([str(x) for x in row_data]))

    except Exception as e:
        print(f"Error reading xlsx: {e}")

if __name__ == "__main__":
    read_xlsx(r"c:\Users\rayde\OneDrive\Documents\invokeai\hades 5_4.xlsx")
