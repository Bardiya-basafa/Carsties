namespace Shared.Entities;

public interface IValidationResult {

    public readonly static Error ValidationError = new Error("Validation Error", "A validation error has occurred.");

    Error[] Errors { get; }

}
