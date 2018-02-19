# config valid for current version and patch releases of Capistrano
lock "~> 3.10.1"

set :application, "imdb-react"
set :repo_url, "git@example.com:me/my_repo.git"

set :linked_dirs, %w(v1/node_modules)
set :repo_url, 'git@bitbucket.org:JAYMODII/imdb-react.git'
set :branch, 'after-rebase'

set :deploy_to, "/home/deploy/imdb/imdb-react"
set :keep_releases, 5

set :rvm_type, :user
set :rvm_ruby_string, '2.4.1'

set :nvm_type, :user
set :nvm_node, 'v0.33.4'
set :nvm_map_bins, %w{node npm}
