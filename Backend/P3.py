def format_embossing(data_dict):
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
        "Line1": "90123456 SMITH/J",
        "Line2": "MR TEST CARD",
        "Line3": "My Corp Mr J Smith",
        "Line4": "123 Elm St Suite",
        "Line5": "456 Cityville, State, Country."
    }
    result = ""
    offset = 0  
    
    full_content = " ".join(f"{line_label} {line_content}" for line_label, line_content in data_dict.items()).encode("utf-8")

    for i in range(0, len(full_content), 16):

        chunk = full_content[i:i + 16]

        hex_part = " ".join(f"{byte:02x}" for byte in chunk)

        ascii_part = "".join(chr(byte) if 32 <= byte <= 126 else "." for byte in chunk)

        result += f"{offset:08x}  {hex_part:<47}  {ascii_part}\n"

        offset += 16

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

    formatted_embossing_data = format_embossing(embossing_details)
    print(formatted_embossing_data)

    with open("embossing_data_inline.txt", "w") as file:
        file.write(formatted_embossing_data)
