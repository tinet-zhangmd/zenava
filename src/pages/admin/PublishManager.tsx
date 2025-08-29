import { FC, JSX } from 'hono/jsx'

export const PublishManager: FC = () => {
  return (
    <div>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Publish Manager</h1>
        <p class="text-gray-600">Manage site versions, generate static pages, and deploy to production</p>
      </div>

      {/* Quick Actions */}
      <div class="grid md:grid-cols-4 gap-4 mb-8">
        <button id="btn-create-version" class="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
          <i class="fas fa-code-branch text-2xl mb-2"></i>
          <div>Create Version</div>
        </button>
        <button id="btn-build-site" class="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
          <i class="fas fa-hammer text-2xl mb-2"></i>
          <div>Build Static Site</div>
        </button>
        <button id="btn-publish-prod" class="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
          <i class="fas fa-rocket text-2xl mb-2"></i>
          <div>Publish to Production</div>
        </button>
        <button id="btn-purge-cache" class="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
          <i class="fas fa-sync text-2xl mb-2"></i>
          <div>Purge CDN Cache</div>
        </button>
      </div>

      {/* Version List */}
      <div class="bg-white rounded-lg shadow-sm mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Version History</h2>
        </div>
        
        <div id="versions-list" class="p-6">
          <div class="text-gray-500">Loading versions...</div>
        </div>
      </div>

      {/* Build Status */}
      <div class="bg-white rounded-lg shadow-sm">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Build Status</h2>
        </div>
        
        <div id="build-status" class="p-6">
          <div class="text-gray-500">No active builds</div>
        </div>
      </div>

      {/* Version Creation Modal */}
      <div id="version-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg w-full max-w-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-xl font-semibold">Create New Version</h3>
          </div>
          
          <div class="p-6">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Version Name</label>
              <input type="text" id="version-name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Holiday Update" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="version-description" rows="3" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="What's included in this version?"></textarea>
            </div>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button id="btn-cancel-version" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button id="btn-save-version" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Version
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let versions = [];
        let currentVersion = null;

        // Load versions on init
        loadVersions();

        async function loadVersions() {
          try {
            const response = await fetch('/api/publish/versions');
            const data = await response.json();
            
            if (data.success) {
              versions = data.data;
              displayVersions();
            }
          } catch (error) {
            console.error('Error loading versions:', error);
          }
        }

        function displayVersions() {
          const container = document.getElementById('versions-list');
          
          if (versions.length === 0) {
            container.innerHTML = '<div class="text-gray-500">No versions found. Create your first version!</div>';
            return;
          }
          
          container.innerHTML = \`
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Version</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Pages</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  \${versions.map(version => \`
                    <tr class="border-b border-gray-100 hover:bg-gray-50">
                      <td class="py-3 px-4">
                        <code class="text-sm bg-gray-100 px-2 py-1 rounded">\${version.version_number}</code>
                      </td>
                      <td class="py-3 px-4">\${version.version_name || '-'}</td>
                      <td class="py-3 px-4">\${version.pages_count || 0}</td>
                      <td class="py-3 px-4">
                        <span class="px-2 py-1 text-xs rounded-full \${
                          version.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : version.status === 'built'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }">
                          \${version.status}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-sm text-gray-600">
                        \${new Date(version.created_at).toLocaleDateString()}
                      </td>
                      <td class="py-3 px-4">
                        <div class="flex gap-2">
                          \${version.status === 'draft' ? \`
                            <button onclick="buildVersion(\${version.id})" class="text-blue-600 hover:text-blue-700" title="Build">
                              <i class="fas fa-hammer"></i>
                            </button>
                          \` : ''}
                          \${version.status === 'built' ? \`
                            <button onclick="publishVersion(\${version.id})" class="text-green-600 hover:text-green-700" title="Publish">
                              <i class="fas fa-rocket"></i>
                            </button>
                          \` : ''}
                          \${version.status === 'published' ? \`
                            <span class="text-green-600" title="Currently Live">
                              <i class="fas fa-check-circle"></i>
                            </span>
                          \` : ''}
                          \${version.status === 'archived' ? \`
                            <button onclick="rollbackToVersion(\${version.id})" class="text-orange-600 hover:text-orange-700" title="Rollback">
                              <i class="fas fa-undo"></i>
                            </button>
                          \` : ''}
                        </div>
                      </td>
                    </tr>
                  \`).join('')}
                </tbody>
              </table>
            </div>
          \`;
        }

        // Create new version
        document.getElementById('btn-create-version').addEventListener('click', () => {
          document.getElementById('version-modal').classList.remove('hidden');
        });

        document.getElementById('btn-cancel-version').addEventListener('click', () => {
          document.getElementById('version-modal').classList.add('hidden');
        });

        document.getElementById('btn-save-version').addEventListener('click', async () => {
          const name = document.getElementById('version-name').value;
          const description = document.getElementById('version-description').value;
          
          try {
            const response = await fetch('/api/publish/versions/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ versionName: name, description })
            });
            
            const data = await response.json();
            
            if (data.success) {
              alert(\`Version \${data.data.version_number} created successfully!\`);
              document.getElementById('version-modal').classList.add('hidden');
              loadVersions();
            } else {
              alert('Error: ' + data.error);
            }
          } catch (error) {
            console.error('Error creating version:', error);
            alert('Error creating version');
          }
        });

        // Build static site
        document.getElementById('btn-build-site').addEventListener('click', async () => {
          const latestDraft = versions.find(v => v.status === 'draft');
          if (!latestDraft) {
            alert('No draft version available. Create a new version first.');
            return;
          }
          
          await buildVersion(latestDraft.id);
        });

        async function buildVersion(versionId) {
          if (!confirm('Start building static site for this version?')) return;
          
          updateBuildStatus('Building...', 'info');
          
          try {
            const response = await fetch(\`/api/publish/build/\${versionId}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ baseUrl: window.location.origin })
            });
            
            const data = await response.json();
            
            if (data.success) {
              updateBuildStatus(
                \`Build completed! \${data.data.pagesBuilt} pages built in \${data.data.buildTime}\`,
                'success'
              );
              loadVersions();
            } else {
              updateBuildStatus('Build failed: ' + data.error, 'error');
            }
          } catch (error) {
            console.error('Error building:', error);
            updateBuildStatus('Build failed', 'error');
          }
        }

        // Publish to production
        document.getElementById('btn-publish-prod').addEventListener('click', async () => {
          const builtVersion = versions.find(v => v.status === 'built');
          if (!builtVersion) {
            alert('No built version available. Build a version first.');
            return;
          }
          
          await publishVersion(builtVersion.id);
        });

        async function publishVersion(versionId) {
          if (!confirm('Publish this version to production? This will replace the current live site.')) return;
          
          updateBuildStatus('Publishing to production...', 'info');
          
          try {
            const response = await fetch(\`/api/publish/publish/\${versionId}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ environment: 'production' })
            });
            
            const data = await response.json();
            
            if (data.success) {
              updateBuildStatus(
                \`Successfully published! \${data.data.filesDeployed} files deployed to \${data.data.deploymentUrl}\`,
                'success'
              );
              loadVersions();
            } else {
              updateBuildStatus('Publish failed: ' + data.error, 'error');
            }
          } catch (error) {
            console.error('Error publishing:', error);
            updateBuildStatus('Publish failed', 'error');
          }
        }

        // Rollback to version
        async function rollbackToVersion(versionId) {
          if (!confirm('Rollback to this version? Current content will be replaced.')) return;
          
          updateBuildStatus('Rolling back...', 'info');
          
          try {
            const response = await fetch(\`/api/publish/rollback/\${versionId}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({})
            });
            
            const data = await response.json();
            
            if (data.success) {
              updateBuildStatus('Rollback successful!', 'success');
              loadVersions();
            } else {
              updateBuildStatus('Rollback failed: ' + data.error, 'error');
            }
          } catch (error) {
            console.error('Error rolling back:', error);
            updateBuildStatus('Rollback failed', 'error');
          }
        }

        // Purge CDN cache
        document.getElementById('btn-purge-cache').addEventListener('click', async () => {
          if (!confirm('Purge all CDN cache? This may temporarily slow down the site.')) return;
          
          try {
            const response = await fetch('/api/publish/cache/purge', {
              method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
              alert('CDN cache purged successfully!');
            } else {
              alert('Error: ' + data.error);
            }
          } catch (error) {
            console.error('Error purging cache:', error);
            alert('Error purging cache');
          }
        });

        function updateBuildStatus(message, type) {
          const container = document.getElementById('build-status');
          const alertClass = type === 'success' ? 'bg-green-50 text-green-800' 
                            : type === 'error' ? 'bg-red-50 text-red-800' 
                            : 'bg-blue-50 text-blue-800';
          
          container.innerHTML = \`
            <div class="\${alertClass} p-4 rounded-lg">
              \${type === 'info' ? '<i class="fas fa-spinner fa-spin mr-2"></i>' : ''}
              \${message}
            </div>
          \`;
        }
      `}} />
    </div>
  )
}