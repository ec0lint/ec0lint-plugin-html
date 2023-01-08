---
id: disable-rules-with-inline-comments
title: Disable rules with inline comments
---

## Disable rules with inline comments.

To disable rule in a file, use HTML comments (`<!-- ... -->`) in the following format:

* Disable all rules in an entire file:

```html
<!-- ec0lint-disable -->
<div foo="foo" foo="foo"></div>
```

* Disable or enable specific rules in an entire file:

```html
<!-- ec0lint-disable html-ec0lint/lazy-load -->
<div foo="foo" foo="foo"></div>

<!-- eslint-enable html-ec0lint/lazy-load  -->
<div foo="foo" foo="foo"></div>
```

* Disable all rules on a specific line:

```html
<!-- ec0lint-disable-next-line -->
<div foo="foo" foo="foo"></div>
```

* Disable a specific rule on a specific line:

```html
<!-- ec0lint-disable-next-line html-ec0lint/lazy-load -->
<div foo="foo" foo="foo"></div>
```
