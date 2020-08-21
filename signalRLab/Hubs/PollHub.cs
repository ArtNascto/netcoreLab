using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Lab.Hubs
{
    public class PollHub : Hub
    {
        public async Task SendMessage(string user, string pollId, string pollVal)
        {
            var time =  DateTime.Now.ToShortDateString()+ " às " +  DateTime.Now.ToLongTimeString();
            await Clients.All.SendAsync("ReceiveMessage", user, pollId, pollVal,time);
        }
    }
}