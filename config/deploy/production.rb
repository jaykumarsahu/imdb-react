server '13.58.158.49', user: 'deploy', roles: %w{web app}

namespace :script do
  task :build do
    on roles(:app), in: :sequence, wait: 5 do
      execute "cd #{release_path}/v1 && npm install && npm run build"
    end
  end
end
