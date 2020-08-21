using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
namespace signalRLab
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message,e);
            }
        }

        public static IWebHostBuilder CreateHostBuilder(string[] args)
        {
            return new WebHostBuilder().UseKestrel(options =>
            {
                options.AddServerHeader = false;
                options.Limits.MaxRequestLineSize = 16 * 1024;
            })
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseUrls("http://*:5000")
            .UseStartup<Startup>();

        }
    }
}
