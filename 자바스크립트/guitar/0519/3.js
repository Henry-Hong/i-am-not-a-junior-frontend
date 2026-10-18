function $val(selector) {
  const el = document.querySelector(selector);
  return el ? el.value : "";
}

function $checkedVal(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : null;
}

function isNonEmpty(value) {
  return value.trim().length > 0;
}

function isValidEmail(email) {
  const parts = email.split("@");
  if (parts.length !== 2) return false;

  const [emailPart, domainPart] = parts;
  const pattern = /^[a-zA-Z0-9.]{1,64}$/;
  return pattern.test(emailPart) && pattern.test(domainPart);
}

function isValidPhone(phone) {
  const pattern = /^[\d\s-]+$/;
  if (!pattern.test(phone)) return false;

  const MIN_DIGIT_COUNT = 6;
  const digitCount = (phone.match(/\d/g) || []).length;
  return digitCount >= MIN_DIGIT_COUNT;
}

function solution() {
  const type = $checkedVal("type");

  const validators = {
    person: {
      first_name: [isNonEmpty],
      last_name: [isNonEmpty],
      email: [isNonEmpty, isValidEmail],
    },
    company: {
      company_name: [isNonEmpty],
      phone: [isNonEmpty, isValidPhone],
    },
  };

  const validateForm = (rules) => {
    for (const [field, tests] of Object.entries(rules)) {
      const value = $val(`#${field}`);
      for (const test of tests) {
        if (!test(value)) return false;
      }
    }
    return true;
  };

  return validateForm(validators[type]);
}
