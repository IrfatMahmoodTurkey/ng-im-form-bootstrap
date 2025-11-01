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

```npm install @irfat/angular-dynamic-form-builder```
```npm install bootstrap@5.3.8```
```npm install @fortawesome/fontawesome-free@7.1.0```

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

In your main app module ```(app.module.ts)```, import the ```FormBuilderModule``` or ```FormPreviewModule```:

```
import { DynamicFormBuilderModule } from '@irfat/angular-dynamic-form-builder';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## ✅ Verify Installation

Once installed, you can use the component selector in any template:

```
<app-form-builder [preset]="null"><app-form-builder>
```

If you see Bootstrap styling and Font Awesome icons properly rendered, your setup is complete 🎉
#
