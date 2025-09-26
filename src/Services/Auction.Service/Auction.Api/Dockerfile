FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/Auction.Service/Auction.Api/Auction.Api.csproj", "src/Services/Auction.Service/Auction.Api/"]
COPY ["src/Services/Auction.Service/Auction.infrastructure/Auction.infrastructure.csproj", "src/Services/Auction.Service/Auction.infrastructure/"]
COPY ["src/Services/Auction.Service/Auction.Domain/Auction.Domain.csproj", "src/Services/Auction.Service/Auction.Domain/"]
COPY ["src/Shared/Shared/Shared.csproj", "src/Shared/Shared/"]
COPY ["src/Services/Auction.Service/Auction.Application/Auction.Application.csproj", "src/Services/Auction.Service/Auction.Application/"]
RUN dotnet restore "src/Services/Auction.Service/Auction.Api/Auction.Api.csproj"
COPY . .
WORKDIR "/src/src/Services/Auction.Service/Auction.Api"
RUN dotnet build "Auction.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Auction.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Auction.Api.dll"]
