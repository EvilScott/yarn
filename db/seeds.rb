admin = User.create!(name: 'admin', password: 'admin', password_confirmation: 'admin', admin: true)
anon = User.create!(name: 'anon', password: 'anon', password_confirmation: 'anon')
first_post = Post.create(content: 'test post, do not reply', user: admin)
Post.create!(content: 'bump', parent: first_post, user: anon)
