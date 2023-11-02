import pandas as pd
from yahooquery import Ticker
import sys
import json

ticker_symbol = sys.argv[1]
# ticker_symbol = 'AAPL'

# Initialize the Ticker object with the dynamic ticker_symbol
ticker = Ticker(ticker_symbol)

# Fetching company asset profile
company_profile = ticker.asset_profile[ticker_symbol]
company_profile_json = json.dumps(company_profile)

# Fetching financial statements
income_statement = ticker.income_statement()
cash_flow_statement = ticker.cash_flow()
balance_sheet = ticker.balance_sheet()

income_statement_json = income_statement.to_json(orient='split')
cash_flow_statement_json = cash_flow_statement.to_json(orient='split')
balance_sheet_json = balance_sheet.to_json(orient='split')

# Fetching institutional ownership data
institutional_holders = ticker.institution_ownership
institutional_holders_json = ticker.institution_ownership.to_json(orient='split')

# Fetching historical stock data
one_day = ticker.history(period='1d', interval='1m')
five_day = ticker.history(period='5d', interval='5m')
one_month = ticker.history(period='1mo', interval='15m')
six_month = ticker.history(period='6mo', interval='1h')
one_year = ticker.history(period='1y', interval='1d')
five_year = ticker.history(period='5y', interval='1d')
max_data = ticker.history(period='max', interval='1wk')

one_day_json = one_day.reset_index().to_json(orient='records')
five_day_json = five_day.reset_index().to_json(orient='records')
one_month_json = one_month.reset_index().to_json(orient='records')
six_month_json = six_month.reset_index().to_json(orient='records')
one_year_json = one_year.reset_index().to_json(orient='records')
five_year_json = five_year.reset_index().to_json(orient='records')
max_data_json = max_data.reset_index().to_json(orient='records')

combined_data = {
    'companyProfile': company_profile_json 
}

json_string = json.dumps(combined_data)

print(ticker_symbol)