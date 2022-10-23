interface UserValue {
  label: string
  value: string
}

export const fakeApi = async (username: string): Promise<UserValue[]> => {
  console.log('fetching user', username)

  const res = await fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then(
      (body) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        body.results.map(
          (user: {
            name: { first: string; last: string }
            login: { username: string }
          }) => ({
            label: `${user.name.first} ${user.name.last}`,
            value: user.login.username,
          }),
        ),
      // eslint-disable-next-line function-paren-newline
    )

  return res
}
