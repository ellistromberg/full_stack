const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('sala')
      await page.getByRole('button', { name: 'login' }).click()
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('playwright blog')
      await textboxes[1].fill('playwright author')
      await textboxes[2].fill('playwright url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('a new blog playwright blog by playwright author added')).toBeVisible()
    })
  })

  describe('Liking a blog', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      
      await expect(page.getByRole('button', { name: 'new blog' })).toBeVisible()
      await page.getByRole('button', { name: 'new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('playwright blog')
      await textboxes[1].fill('playwright author')
      await textboxes[2].fill('playwright url')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })

  describe('Deleting a blog', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      
      await page.getByRole('button', { name: 'new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('playwright blog')
      await textboxes[1].fill('playwright author')
      await textboxes[2].fill('playwright url')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('a blog can be deleted', async ({ page }) => {
      const blog = page.getByText('playwright blog playwright author').locator('..')
      await expect(blog).toBeVisible()
      await page.getByRole('button', { name: 'view '}).click()

      page.on('dialog', dialog => dialog.accept())
      await blog.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('playwright blog playwright author')).toHaveCount(0)
    })
  })

  describe('Remove button visibility', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      
      await page.getByRole('button', { name: 'new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('playwright blog')
      await textboxes[1].fill('playwright author')
      await textboxes[2].fill('playwright url')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'logout' }).click()
    })

    test('user who added the blog can see the remove button', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      const blog = page.getByText('playwright blog playwright author').locator('..')
      await expect(blog).toBeVisible()
      await page.getByRole('button', { name: 'view '}).click()

      await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('user who did not add the blog cannot see the remove button', async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'Elli Strömberg',
          username: 'ellist',
          password: 'salainen'
        }
      })
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('ellist')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      const blog = page.getByText('playwright blog playwright author').locator('..')
      await expect(blog).toBeVisible()
      await page.getByRole('button', { name: 'view '}).click()

      await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})