enum TextboxTypesEnum {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  DATE = 'date',
  TIME = 'time',
  WEEK = 'week',
  TEL = 'tel',
}

enum TextboxValidationsEnum {
  EMAIL = 'email',
  MIN = 'min',
  MAX = 'max',
  MIN_LEN = 'min_len',
  MAX_LEN = 'max_len',
}

const TEXTBOX_TYPES: {
  type: TextboxTypesEnum;
  validations: TextboxValidationsEnum[];
}[] = [
  {
    type: TextboxTypesEnum.TEXT,
    validations: [
      TextboxValidationsEnum.EMAIL,
      TextboxValidationsEnum.MIN_LEN,
      TextboxValidationsEnum.MAX_LEN,
    ],
  },
  {
    type: TextboxTypesEnum.NUMBER,
    validations: [TextboxValidationsEnum.MIN, TextboxValidationsEnum.MAX],
  },
  {
    type: TextboxTypesEnum.EMAIL,
    validations: [TextboxValidationsEnum.EMAIL],
  },
  {
    type: TextboxTypesEnum.DATE,
    validations: [],
  },
  {
    type: TextboxTypesEnum.TIME,
    validations: [],
  },
  {
    type: TextboxTypesEnum.WEEK,
    validations: [],
  },
  {
    type: TextboxTypesEnum.TEL,
    validations: [],
  },
];

export const TEXTBOX_UTILITIES = {
  TextboxTypesEnum,
  TextboxValidationsEnum,
  TEXTBOX_TYPES,
};
