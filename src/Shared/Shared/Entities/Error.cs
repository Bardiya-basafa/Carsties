namespace Shared.Entities;

public sealed class Error(string code, string message) : IEquatable<Error> {

    public readonly static Error None = new Error(string.Empty, string.Empty);

    public readonly static Error NullValue = new Error("Error.NullValue", "The specified value is null.");
    

    public string Code { get; } = code;

    public string Message { get; } = message;

    public static implicit operator string(Error error)
    {
        return error.Code;
    }

    public static bool operator ==(Error? a, Error? b)
    {
        if (a is null && b is null){
            return true;
        }

        if (a is null || b is null){
            return false;
        }

        return a.Equals(b);
    }

    public static bool operator !=(Error? a, Error? b)
    {
        return !(a == b);
    }


    public bool Equals(Error? other)
    {
        if (other is null){
            return false;
        }

        return Code == other.Code && Message == other.Message;
    }

    public override bool Equals(object? obj)
    {
        return obj is Error error && Equals(error);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Code, Message);
    }

    public override string ToString()
    {
        return $"{Code}: {Message}";
    }

}
