FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/Notification.Service/Notification.Service/Notification.Service.csproj", "src/Services/Notification.Service/Notification.Service/"]
RUN dotnet restore "src/Services/Notification.Service/Notification.Service/Notification.Service.csproj"
COPY . .
WORKDIR "/src/src/Services/Notification.Service/Notification.Service"
RUN dotnet build "./Notification.Service.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Notification.Service.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Notification.Service.dll"]
