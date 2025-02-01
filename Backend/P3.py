from encrypt import *
from scrap import scrap_track
from pin_block import iso0_pin_block

def emboss_data(data):
    """
    Formats embossing data with line labels included on the same row,
    separated by spaces, and displayed in a hex-dump style layout.

    Args:
        data_dict (dict): Dictionary containing embossing details.
            Keys: Line identifiers (e.g., Line1, Line2, etc.)
            Values: Corresponding data for each line.

    Returns:
        str: Hex-dump style formatted embossing data with line labels included inline.
    """
    embossing_details = {
        "Line1": data[0][:4]+ ' ' + data[0][4:8] + " " +data[0] [ 8: 12] + " " + data[0][ 12: 16],
        "Line2": data[1],
        "Line3": data[2],
        "Line4": data[3],
        "Line5": data[4]
    }
    print(data[4])
    
    
    full_content = "$"+" ".join(f"{line_label} {line_content}" for line_label, line_content in embossing_details.items()) + r'"'
    return full_content

def encode(full_content):

    full_content = full_content.encode("utf-8")
    result = ""
    offset = 0  

    for i in range(0, len(full_content), 16):

        chunk = full_content[i:i + 16]

        hex_part = " ".join(f"{byte:02x}" for byte in chunk)

        ascii_part = "".join(chr(byte) if 32 <= byte <= 126 else "." for byte in chunk)

        result += f"{offset:08x}  {hex_part:<47}  {ascii_part}\n"

        offset += 16

    return result

def tracks(data):
    disc_data = generate_disc()
    track_data = scrap_track(data + [disc_data])
    return track_data


def carrier(data):
    result = ""
    result = data[0] + "_V_" + data[1]+"|"+ data[1] +data[2] + "|" + data[3] + "|" + data[4] + "|" + data[5] + "|" + data[6] + "|" + data[7] + "|" + data[8]
    return result

def chip(data):
    result = data[0] + data[1] + data[2]
    block = iso0_pin_block(data[3], data[2])
    result += block
    return result 


if __name__ == "__main__":
# Example usage:
    embossing_details = {
        "Line1": "90123456 SMITH/J",
        "Line2": "MR TEST CARD",
        "Line3": "My Corp Mr J Smith",
        "Line4": "123 Elm St Suite",
        "Line5": "456 Cityville, State, Country."
    }      

    formatted_embossing_data = emboss_data(embossing_details)
    print(formatted_embossing_data)

    with open("embossing_data_inline.txt", "w") as file:
        file.write(formatted_embossing_data)
