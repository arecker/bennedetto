import locale

locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')


def display_money(decimal):     # right now this is pretty much just
    return locale.currency(decimal, grouping=True)  # for debugging usage
