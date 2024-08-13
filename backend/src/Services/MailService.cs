using System.Net;
using System.Net.Mail;

namespace API.Services;

public class MailService {

    readonly SmtpClient client;
    readonly IConfiguration config;

    public MailService(IConfiguration config) {

        this.config = config;

        client = new()
        {
            Host = config.GetValue<string>("Mail:Host") ?? "",
            Port = config.GetValue<int>("Mail:Port"),
            EnableSsl = true,
            Credentials = new NetworkCredential(){
                UserName = config.GetValue<string>("Mail:Username"),
                Password = config.GetValue<string>("Mail:Password")
            }
        };

    }

    public async Task<bool> SendEmail(string to, string subject, string body) {
        return await SendEmail([to], [], [], subject, body);
    }

    public async Task<bool> SendEmail(string[] to, string subject, string body) {
        return await SendEmail(to, [], [], subject, body);
    }

    public async Task<bool> SendEmail(string[] to, string[] cc, string subject, string body) {
        return await SendEmail(to, cc, [], subject, body);
    }

    public async Task<bool> SendEmail(string[] to, string[] cc, string[] bcc, string subject, string body) {

        MailMessage message = new()
        {
            From = new MailAddress(config.GetValue<string>("Mail:Username") ?? "", config.GetValue<string>("Mail:DisplayName"))
        };

        foreach (string recipient in to) {
            message.To.Add(recipient);
        }

        foreach (string recipient in cc) {
            message.CC.Add(recipient);
        }

        foreach (string recipient in bcc) {
            message.Bcc.Add(recipient);
        }

        message.Subject = subject;

        message.IsBodyHtml = true;
        message.Body = body;

        try {
            await client.SendMailAsync(message);
            return true;
        } catch (Exception e) {
            Console.WriteLine(e);
            return false;
        }

    }

}