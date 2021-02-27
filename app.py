from flask import Flask, render_template, url_for, request
import pandas
from datetime import datetime as dt
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
from pyngrok import ngrok
from whatsapp_message import TriggerOrderReceivedMessage

app = Flask(__name__)
# url = ngrok.connect(5000).public_url
# print(f"The NGROK URl: {url}")

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('muse-product-order-form-363670efdb36.json', scope)
client = gspread.authorize(creds)

@app.route('/asset-allocation', methods=['GET', 'POST'])
def DisplayProductOrderForm():
    return render_template('index.html')


# @app.route('/bot', methods=['POST'])
# def bot():
#     incoming_message = request.values.get('Body', '').lower()
#     response = MessagingResponse()
#     msg = response.message

@app.route('/returns', methods=['GET', 'POST'])
def StoreDataToGSheet():
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    
    temp = request.form.get('mogra_units_50_gm')
    print(temp)

    mogra_units_50_gm = request.form.get('mogra_units_50_gm')
    mogra_units_250_gm = request.form.get('mogra_units_250_gm')

    sonchafa_units_50_gm = request.form.get('sonchafa_units_50_gm')
    sonchafa_units_250_gm = request.form.get('sonchafa_units_250_gm')

    gulab_units_50_gm = request.form.get('gulab_units_50_gm')
    gulab_units_250_gm = request.form.get('gulab_units_250_gm')

    mobile_number = request.form.get('mobile_number')
    email_address = request.form.get('email_address')
    
    home_delivery_option = request.form.get('home_delivery_option')
    shipping_address = request.form.get('shipping_address') if home_delivery_option == "Yes" else "No Home Delivery Opted"
 
    total_amount = (mogra_units_50_gm + gulab_units_50_gm + sonchafa_units_50_gm)*20 + (mogra_units_250_gm + gulab_units_250_gm + sonchafa_units_250_gm)*100

    ss = client.open("MUSE Product Order Form")
    wks = ss.worksheet("Sheet1")

    current_length = wks.col_values(2).__len__()

    order_id = "MUSE"+str(current_length+1)

    shipping_address = shipping_address if home_delivery_option == "Yes" else "NA"
    
    mogra_units_50_gm = mogra_units_50_gm if mogra_units_50_gm != None else 0
    mogra_units_250_gm = mogra_units_250_gm if mogra_units_250_gm != None else 0

    sonchafa_units_50_gm = mogra_units_50_gm if sonchafa_units_50_gm != None else 0
    sonchafa_units_250_gm = mogra_units_50_gm if sonchafa_units_250_gm != None else 0

    gulab_units_50_gm = gulab_units_50_gm if gulab_units_50_gm != None else 0
    gulab_units_250_gm = gulab_units_50_gm if gulab_units_250_gm != None else 0

    total_amount = total_amount if total_amount != None else 0

    wks.update('A'+str(current_length+1), order_id)
    wks.update('B'+str(current_length+1), str(dt.now()))
    wks.update('C'+str(current_length+1), mogra_units_50_gm)
    wks.update('D'+str(current_length+1), mogra_units_250_gm)
    wks.update('E'+str(current_length+1), sonchafa_units_50_gm)
    wks.update('F'+str(current_length+1), sonchafa_units_250_gm)
    wks.update('G'+str(current_length+1), gulab_units_50_gm)
    wks.update('H'+str(current_length+1), gulab_units_250_gm)
    wks.update('I'+str(current_length+1), total_amount)
    wks.update('J'+str(current_length+1), "Acceptance in Progress")
    wks.update('K'+str(current_length+1), first_name)
    wks.update('L'+str(current_length+1), last_name)
    wks.update('M'+str(current_length+1), mobile_number)
    wks.update('N'+str(current_length+1), email_address)
    wks.update('O'+str(current_length+1), home_delivery_option)
    wks.update('P'+str(current_length+1), shipping_address)

    print(TriggerOrderReceivedMessage(first_name, last_name, order_id, total_amount, mobile_number, email_address, "Acceptance in Progress", home_delivery_option, shipping_address))
    return "Hurray! check the sheet"    

if __name__ == '__main__':
    app.run() 