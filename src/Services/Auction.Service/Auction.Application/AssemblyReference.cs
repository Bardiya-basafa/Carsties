namespace Auction.Application;

using System.Reflection;

public static class AssemblyReference
{
    public readonly static Assembly Assembly = typeof(AssemblyReference).Assembly;
}