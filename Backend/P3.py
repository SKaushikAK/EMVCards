def format_embossing_data_with_lines_included(data_dict):
    """
    Formats embossing data with line labels included in the encoded data
    and displayed in a hex-dump style layout.

    Args:
        data_dict (dict): Dictionary containing embossing details.
            Keys: Line identifiers (e.g., Line1, Line2, etc.)
            Values: Corresponding data for each line.

    Returns:
        str: Hex-dump style formatted embossing data with line labels included.
    """
    
    
    result = ""
    offset = 0  # Initialize the hexadecimal offset

    for line_label, line_content in data_dict.items():
        # Combine the line label and its content
        full_content = f"{line_label} {line_content}".encode("utf-8")

        # Process data in chunks of 16 bytes
        for i in range(0, len(full_content), 16):
            # Get the current chunk
            chunk = full_content[i:i + 16]

            # Create the hexadecimal part
            hex_part = " ".join(f"{byte:02x}" for byte in chunk)

            # Create the ASCII part (replace non-printable characters with '.')
            ascii_part = "".join(chr(byte) if 32 <= byte <= 126 else "." for byte in chunk)

            # Append the formatted line
            result += f"{offset:08x}  {hex_part:<47}  {ascii_part}\n"

            # Increment the offset
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

    # Generate the formatted embossing data with lines included
    formatted_embossing_data = format_embossing_data_with_lines_included(embossing_details)
    print(formatted_embossing_data)

    # Save to a file
    with open("embossing_data_with_lines_included.txt", "w") as file:
        file.write(formatted_embossing_data)
