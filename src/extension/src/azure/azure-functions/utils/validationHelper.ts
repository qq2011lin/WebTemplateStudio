import { FunctionSelections } from "../functionProvider";
import { ValidationError } from "../../../errors";
import { CONSTANTS } from "../../../constants";

export namespace ValidationHelper {
  const MAX_NAME_LEN = 60;
  const MIN_NAME_LEN = 3;

  export function validate(selections: FunctionSelections): void {
    validateFunctionNames(selections.functionNames);
    validateFunctionAppName(selections.functionAppName);
  }

  function validateFunctionNames(names: string[]): void {
    for (var name of names) {
      if (name.length > MAX_NAME_LEN || name.length < MIN_NAME_LEN) {
        throw new ValidationError(
          CONSTANTS.ERRORS.NAME_MIN_MAX(MIN_NAME_LEN, MAX_NAME_LEN)
        );
      }
      checkFunctionNameRegex(name);
    }

    names = names.map(function(name) {
      return name.toLowerCase();
    });

    if (new Set(names).size !== names.length) {
      throw new ValidationError(CONSTANTS.ERRORS.FUNCTIONS_NO_DUPLICATES);
    }
  }

  export function validateFunctionAppName(name: string): void {
    if (name.length > MAX_NAME_LEN || name.length < MIN_NAME_LEN) {
      throw new ValidationError(
        CONSTANTS.ERRORS.NAME_MIN_MAX(MIN_NAME_LEN, MAX_NAME_LEN)
      );
    }

    checkFunctionNameRegex(name);
  }

  function checkFunctionNameRegex(name: string): void {
    let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/;
    if (!regexp.test(name)) {
      throw new ValidationError(CONSTANTS.ERRORS.FUNCTIONS_INVALID_NAME(name));
    }
  }
}