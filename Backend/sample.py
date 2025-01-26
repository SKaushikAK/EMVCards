embossing_data = (
    f"Line1 {card_data['card_number']} {card_data['branch_code']} {card_data['service_code']} 0042",
    f"Line2 {card_data['expiry_date']} Line3 MR {card_data['embossed_name']}", 
    f"Line4 {card_data['card_seq_no']} Line5 0042 262"
)

track1_data = f"%B{str(card_data['card_number']).zfill(16)}^{card_data['encoded_name'].replace(' ', '/')}^{card_data['expiry_date']}1100000000119000000"

track2_data = f";{str(card_data['card_number']).zfill(16)}={card_data['expiry_date']}1191911"

carrier_data = (
    str(card_data['card_number'])[:7],
    f"{card_data['card_number']}000042_V_1",
    "1", "", "000001",
    str(card_data['card_seq_no']),
    f"MR {card_data['embossed_name']}", 
    "010110",
    card_data['expiry_date'],
    "V", "",
    "CR2 HOUSE",
    "JOYCE WAY",
    "DUBLIN",
    "IE"
)

chip_data = (
    f"9F1F{binascii.hexlify(str(card_data['card_number']).encode()).decode()}",
    f"57{binascii.hexlify(str(card_data['card_number']).encode()).decode()}",
    f"5F3401{card_data['card_seq_no']}",
    f"DF0108{binascii.hexlify(b'encrypted_pin').decode()}"
)

return {
    'record_number': record_number,
    'embossing_data': '\n'.join(embossing_data),
    'track1_data': track1_data,
    'track2_data': track2_data,
    'carrier_data': '|'.join(carrier_data),
    'chip_data': ''.join(chip_data)
}

card_data = {
'id': 3,
'card_number': 7899687,
'branch_code': 9876987,
'service_code': 8976,
'expiry_date': '8967',
'embossed_name': '89768796',
'encoded_name': '98679867',
'card_seq_no': 98679876
}
p3_file_data = generate_p3_file_data(card_data)
print(p3_file_data)