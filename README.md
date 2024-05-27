MD5 password hash for pure javascript

# Installation

Install via npm
```bash
npm i --save @yousefhusain/md5
```

Install via bun
```bash
bun add @yousefhusain/md5
```

# How To Use?

```js
import MD5 from '@yousefhusain/md5'

// hash
const plainTextPassword = 'myPassword123'
const hashedPassword = MD5.hash(plainTextPassword)

// compare
if (MD5.compare(plainTextPassword, hashedPassword)) {
  console.log('Password you entered is right.');
} else {
  console.log('Password you entered is not right')
}
```