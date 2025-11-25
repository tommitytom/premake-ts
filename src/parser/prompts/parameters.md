I am going to provide you with a description of a parameter passed to a function and potentially some other information. I would like you to extract the information and present it in a JSON object with the following structure:

```json
{
  "parameters": {
    "paramName": {
      "description": "Description of the parameter.",
      "options": [
        { "name": "Foo", "description": "Foo description." },
        { "name": "Bar", "description": "Bar description." }
      ]
    }
  },
  "additional": "Any additional information found in the text."
}
```

All "description", "options" and "additional" fields are optional.
If there are option items in a markdown table, you can ignore the headers. Always treat them as "option" and "description". Here is an example:

Provided markdown:
```
`value` is one of:

| Value   | Description                                       |
|---------|---------------------------------------------------|
| On      | Treat headers included with angle brackets as external. |
| Off     | Default. Headers are treated normally. |

Ensure that you have the correct value set.
```

Expected result:
```json
{
  "parameters": {
    "value": {
      "options": [
        { "name": "On", "description": "Treat headers included with angle brackets as external." },
        { "name": "Off", "description": "Default. Headers are treated normally." }
      ]
    }
  },
  "additional": "Ensure that you have the correct value set."
}
```

If there is no description for an option, do not include the "description" field.
For example:

Provided markdown:
```
`value` specifies whether the feature is enabled or disabled. is a string value, one of "On" or "Off".
```

Expected result:
```json
{
  "parameters": {
    "type": {
      "description": "Specifies whether the feature is enabled or disabled.",
      "options": [
        { "name": "On" },
        { "name": "Off" }
      ]
    }
  }
}
```

Your response should contain only the JSON and the enclosing code marks. DO NOT enclose strings in check marks (`) if they are not in the original text.

This is the text I would like you to process:

