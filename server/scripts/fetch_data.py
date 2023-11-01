import pandas as pd
from yahooquery import Ticker

company = 'AAPL'

ticker = Ticker(company)

# Fetching company asset profile
company_profile = ticker.asset_profile[company]

# Fetching financial statements
income_statement = ticker.income_statement()
cash_flow_statement = ticker.cash_flow()
balance_sheet = ticker.balance_sheet()

# Fetching historical stock data
one_day = ticker.history(period='1d', interval='1m')
five_day = ticker.history(period='5d', interval='5m')
one_month = ticker.history(period='1mo', interval='15m')
six_month = ticker.history(period='6mo', interval='1h')
one_year = ticker.history(period='1y', interval='1d')
five_year = ticker.history(period='5y', interval='1d')
max_data = ticker.history(period='max', interval='1wk')

# Fetching institutional ownership data
institutional_holders = ticker.institution_ownership
