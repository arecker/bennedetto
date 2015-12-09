from django.template.loader import get_template
from django.core.mail import send_mail


class VerifyUserEmail(object):
    from_address = 'noreply@bennedetto.com'
    template_name = 'emails/verify_user_email.txt'
    subject = 'Verify Your Account'

    def __init__(self, user=None):
        self.to_address = user.email
        template = get_template(self.template_name)
        self.content = template.render({'user': user})

    def send(self):
        recipients = [self.to_address, ]
        send_mail(self.subject, self.content, self.from_address, recipients)
