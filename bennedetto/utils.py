import locale

locale.setlocale( locale.LC_ALL, '' )


def display_money(decimal):
    return locale.currency(decimal, grouping=True)
