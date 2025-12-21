# 🧩 NG IM FORM powered by Bootstrap

[![Angular](https://img.shields.io/badge/Angular-18.2.0-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-7.1.0-339AF0?logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A flexible and elegant **Angular UI library** for building **submittable dynamic forms** — powered by **Bootstrap styling** and **drag-and-drop** organization.  
Easily create and manage form structures without writing a single line of code.

---

## 🚀 Introduction

The **NG IM FORM powered by Bootstrap** enables developers to create dynamic and configurable forms at runtime.  
It provides a visual interface where users can add **multiple sections**, and within each section, they can insert **form fields** such as text inputs, text areas, select boxes, and radio button groups.

Each section and field can be **reordered via drag-and-drop**, offering total flexibility in form layout.  
The library is built with **Bootstrap 5** for a clean, modern, and fully responsive look.

Once the form is designed, it can be **submitted as JSON**, making it ideal for scenarios like:

- Custom form builders
- Survey generators
- Dynamic data entry systems

---

## ✨ Features

✅ **Dynamic Section Management** – Add, rename, and remove multiple form sections.  
✅ **Rich Field Types** – Supports text fields, text areas, select boxes, and radio button groups.  
✅ **Drag & Drop Reordering** – Reorder both sections and fields visually.  
✅ **Bootstrap-Based Styling** – Modern and responsive UI out of the box.  
✅ **Configurable Field Settings** – Set labels, placeholders, validations, and default values.  
✅ **Reactive & Submittable** – Fully functional Angular Reactive Forms.  
✅ **JSON Export/Import** – Save or load form structures easily.  
✅ **Reusable Angular Library** – Designed for modular integration into any Angular project.  
✅ **Lightweight & Extensible** – Add new field types or behaviours with minimal effort.

---

## 🛠️ Installation

Install the library and its required peer dependencies via **npm**. Use the following commands:

`npm install ng-im-form-bootstrap`
`npm install bootstrap@5.3.8`
`npm install @fortawesome/fontawesome-free@7.1.0`

---

## ⚙️ Configure Styles

Add Bootstrap and Font Awesome styles to your global configuration in **angular.json**:

```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles.css"
],
"scripts": []
```

Alternatively, if you prefer to import styles directly in your **global stylesheet** (styles.scss or styles.css):

```
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
```

---

## 📦 Import the Library Module

In your main app module `(app.module.ts)`, import the `FormBuilderModule` or `FormPreviewModule`:

```
import { FormBuilderModule  } from 'ng-im-form-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormBuilderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## ✅ Verify Installation

Once installed, you can use the component selector in any template:

```
<ng-im-form-builder [preset]="null"><ng-im-form-builder>
```

If you see Bootstrap styling and Font Awesome icons properly rendered, your setup is complete 🎉

# 🧩 Form Builder Module — ng-im-form-bootstrap

The **Form Builder Module** helps you build fully customizable, dynamic forms with ease.  
It is a part of the **`ng-im-form-bootstrap`** library.

---

## 🚀 Getting Started

### 1️⃣ Import the Module

To use the form builder, import `FormBuilderModule` into your application’s module where you want to use it.

**Example – `app.module.ts`:**

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilderModule } from 'ng-im-form-bootstrap';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormBuilderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 2️⃣ Use the Component

To use the **Form Builder Component**, include the `ng-im-form-builder` selector in your component’s HTML file.

### Example – `app.component.html`

```
<ng-im-form-builder
  [preset]="null"
  (publishFormEvent)="storeNewForm($event)">
</ng-im-form-builder>
```

## ⚙️ Component Details

### 🧩 Inputs

| **Input Name** | **Type**                   | **Description**                                                                 |
| -------------- | -------------------------- | ------------------------------------------------------------------------------- |
| `preset`       | `INgImHorizontalFormModel` | The form structure object. Use this when editing or updating an existing form.  |
| `isPublishing` | `boolean`                  | Controls whether a loading spinner is shown while publishing (saving) the form. |

---

### 📤 Output

| **Output Event**   | **Emit Type**              | **Description**                                                                                    |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------------- |
| `publishFormEvent` | `INgImHorizontalFormModel` | Emits the created form structure. You can handle this event to save the form data to your backend. |

## 🧱 Data Models

Below are the interface definitions used by the **Form Builder Module**.

---

### 🧩 `INgImHorizontalFormModel`

```
export interface INgImHorizontalFormModel {
  checkValidations: boolean;
  submitAPIUrl: string;
  method: APIMethodsEnum;
  sendBodyAs: SendBodyTypesEnum;
  responseMessages: {
    onSuccess: {
      title: string;
      subTitle: string;
    };
    onFailed: {
      title: string;
      subTitle: string;
    };
  };
  sections: INgImHorizonatalFormSectionModel[];
}
```

### 🧩 `INgImHorizonatalFormSectionModel`

```
export interface INgImHorizonatalFormSectionModel {
  id: string;
  title: string;
  subTitle: string;
  class: string;
  headerClass: string;
  bodyClass: string;
  elements: INgImFormElementModel[];
}
```

### 🧩 `INgImFormElementModel`

```
export interface INgImFormElementModel {
  id: string;
  type: string;
  textBoxComponent?: INgImFormTextBoxModel | null;
  textAreaComponent?: INgImFormTextAreaModel | null;
  selectBoxComponent?: INgImFormSelectBoxModel | null;
  fileFieldComponent?: INgImFormFileFieldModel | null;
  checkBoxComponent?: INgImFormCheckBoxModel | null;
  radioButtonGroupComponent?: INgImFormRadioButtonGroupModel | null;
  imageBoxComponent?: INgImFormImageBoxModel | null;
  textComponent?: INgImFormTextModel | null;
}
```

### 🧩 `INgImFormTextBoxModel`

```
export interface INgImFormTextBoxModel {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  class: string;
  validationErrorClass: string;
  value: string;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  validations:
    | {
        type: string;
        min?: number | null;
        max?: number | null;
        minChar?: number | null;
        maxChar?: number | null;
        message: string;
      }[]
    | null;
  regexValidation: {
    expression: string;
    message: string;
  } | null;
}
```

### 🧩 `INgImFormTextAreaModel`

```
export interface INgImFormTextAreaModel {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  class: string;
  validationErrorClass: string;
  rows: number;
  columns: number | null;
  value: string;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  validations:
    | {
        type: string;
        minChar?: number | null;
        maxChar?: number | null;
        message: string;
      }[]
    | null;
  regexValidation: {
    expression: string;
    message: string;
  } | null;
}
```

### 🧩 `INgImFormFileFieldModel`

```
export interface INgImFormFileFieldModel {
  id: string;
  name: string;
  label: string;
  class: string;
  validationErrorClass: string;
  accept: string;
  isMultiple: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  sizeValidation: {
    size: number;
    message: string;
  } | null;
  extensionValidations:
    | {
        extension: string;
        message: string;
      }[]
    | null;
}
```

### 🧩 `INgImFormSelectBoxModel`

```
export interface INgImFormSelectBoxModel {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  class: string;
  validationErrorClass: string;
  isMultiple: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  options:
    | {
        selected: boolean;
        value: string;
        text: string;
      }[]
    | null;
}
```

### 🧩 `INgImFormCheckBoxModel`

```
export interface INgImFormCheckBoxModel {
  id: string;
  name: string;
  label: string;
  class: string;
  validationErrorClass: string;
  checked: boolean;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
}
```

### 🧩 `INgImFormRadioButtonGroupModel`

```
export interface INgImFormRadioButtonGroupModel {
  id: string;
  name: string;
  label: string;
  class: string;
  validationErrorClass: string;
  isReadOnly: boolean;
  isHidden: boolean;
  isRequired: boolean;
  requiredMessage: string | null;
  radioButtons:
    | {
        checked: boolean;
        value: string;
        text: string;
      }[]
    | null;
}
```

### 🧩 `INgImFormImageBoxModel`

```
export interface INgImFormImageBoxModel {
  id: string;
  name: string;
  class: string;
  url: string;
  alt: string;
  height: number;
  width: number;
  alignment: string;
}
```

### 🧩 `INgImFormTextModel`

```
export interface INgImFormTextModel {
  id: string;
  name: string;
  class: string;
  text: string;
  alignment: string;
}
```

## 🧾 Using Form Preview

To **view and use** the form created by the Form Builder, you need to use the **Form Preview Module**.

---

### ⚙️ Step 1: Import the Module

First, import the `FormPreviewModule` into the module where you want to use the Form Preview feature.

**Example – `app.module.ts`**

```
import { FormBuilderModule, FormPreviewModule } from 'ng-im-form-bootstrap';

@NgModule({
  imports: [
    FormPreviewModule,
  ],
  providers: [
    provideHttpClient(),
  ]
})
export class AppModule { }
```

💡 Note:
You must provide Angular’s built-in HTTP Client because it’s required to submit the created form.

### 🧩 Step 2: Use the Component

Now, use the **Form Preview Component** Selector in your component’s HTML file.

**Example – `app.component.html`**

```
<ng-im-form-preview [preset]="form"></ng-im-form-preview>
```

✅ You’re now ready to preview and submit the forms created using the Form Builder!

## ⚙️ Component Details

### 🧩 Inputs

| **Input Name** | **Type**                   | **Description**                                                             |
| -------------- | -------------------------- | --------------------------------------------------------------------------- |
| `preset`       | `INgImHorizontalFormModel` | The form structure object. Use this to view the created form.               |
| `queryParams`  | `Map<string, string>`      | If you want to pass dynamic query parameters through the form’s submit URL. |

### 📤 Output

| **Output Event**     | **Emit Type**       | **Description**                                                                                                  |
| -------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `onSubmitEvent`      | `any`               | Emits the Submit object when the Submit button is clicked.                                                       |
| `onSubmitProcessing` | `any`               | Emits the Submit object when the submission process begins.                                                      |
| `onSubmitSuccess`    | `any`               | Emits the Submit object when the submission process succeeds.                                                    |
| `onSubmitError`      | `HttpErrorResponse` | Emits Angular's HttpErrorResponse object when the submission process encounters any error returned from the API. |

---

## 🏁 Final Notes

🎉 Congratulations! You’ve successfully learned how to **build**, **preview**, and **publish** dynamic forms using the `ng-im-form-bootstrap` library.

With just a few simple steps, you can now:

- ✅ **Create** fully customizable forms using the Form Builder module.
- 👀 **Preview** and **interact** with those forms using the Form Preview module.
- 💾 **Handle** and **save** form data seamlessly through your backend API.

---

### 💡 Next Steps

- Contribute or report issues on GitHub to help improve this project.
- Stay tuned for upcoming modules and enhancements!

---

### ❤️ Thank You for Using `ng-im-form-bootstrap`

If you find this library helpful, please consider giving it a ⭐ on [GitHub](https://github.com/IrfatMahmoodTurkey/ng-im-form-bootstrap)!  
Your support helps make it better for everyone. 🙌

---

➡️ Please read the `CONTRIBUTION.md` file before contributing to this project.
