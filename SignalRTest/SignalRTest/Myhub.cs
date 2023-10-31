using Microsoft.AspNetCore.SignalR;

namespace SignalRTest
{
    public class Myhub : Hub
    {
        public Task SendMessage(string message)
        {
            return Clients.All.SendAsync("message", message);
        }
    }
}
