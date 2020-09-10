console.log('user.js')

const user = {
  familyName: 'Donald John',
  name: 'Trump',
  age: 0
}

console.log(user)
user.gender = 'man'
console.log(user)

export function getUserName() {
  return `${user.familyName} ${user.name}`
}

export function getAge() {
  return user.age
}