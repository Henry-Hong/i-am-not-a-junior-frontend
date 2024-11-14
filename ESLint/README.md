# eslint-plugin-my-plugin

my plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-my-plugin`:

```sh
npm install eslint-plugin-my-plugin --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-my-plugin` and add `my-plugin` to the `plugins` key:

```js
import my-plugin from "eslint-plugin-my-plugin";

export default [
    {
        plugins: {
            my-plugin
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import my-plugin from "eslint-plugin-my-plugin";

export default [
    {
        plugins: {
            my-plugin
        },
        rules: {
            "my-plugin/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                     | Description               | 🔧 |
| :------------------------------------------------------- | :------------------------ | :- |
| [get-current-bitcoin](docs/rules/get-current-bitcoin.md) | get current bitcoin price |    |
| [my-custom-rule](docs/rules/my-custom-rule.md)           | my rule                   |    |
| [prefer-const](docs/rules/prefer-const.md)               | -                         | 🔧 |

<!-- end auto-generated rules list -->


