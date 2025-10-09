namespace Auction.Api;

using System.Globalization;
using Serilog;
using Serilog.Filters;


public static class HostingExtensions {

    public static WebApplicationBuilder ConfigureLogging(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((ctx, lc) => {
            lc.WriteTo.Logger(consoleLogger => {
                consoleLogger.WriteTo.Console(
                outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}",
                formatProvider: CultureInfo.InvariantCulture);

                if (builder.Environment.IsDevelopment()){
                    consoleLogger.Filter.ByExcluding(Matching.FromSource("Duende.IdentityServer.Diagnostics.Summary"));
                }
            });

            if (builder.Environment.IsDevelopment()){
                lc.WriteTo.Logger(fileLogger => {
                    fileLogger
                        .WriteTo.File("./diagnostics/diagnostic.log",
                        rollingInterval: RollingInterval.Day,
                        fileSizeLimitBytes: 1024 * 1024 * 10,// 10 MB
                        rollOnFileSizeLimit: true,
                        outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}",
                        formatProvider: CultureInfo.InvariantCulture)
                        .Filter
                        .ByIncludingOnly(Matching.FromSource("Duende.IdentityServer.Diagnostics.Summary"));
                }).Enrich.FromLogContext().ReadFrom.Configuration(ctx.Configuration);
            }
        });

        return builder;
    }

}
