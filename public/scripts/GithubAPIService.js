/**
 * Class for making request to Github API
 */
class GithubAPIService {

		constructor() {
				this.API_URL = 'https://api.github.com/';
		}

		/**
		 * @param organization
		 * @param type
		 * @param limit
		 * @returns {Promise<any>}
		 */
		async getListofOrganizationRepositories(organization, type = 'public', limit = 3) {
				const url = new URL(`${this.API_URL}users/${organization}/repos`);
				url.search = new URLSearchParams({ limit, type });

				return fetch(url, { method: 'GET' }).then(response => response.json());
		}

		/**
		 * @param owner
		 * @param repository
		 * @returns {Promise<any>}
		 */
		async getContributors(owner, repository) {
				const url = new URL(`${this.API_URL}repos/${owner}/${repository}/contributors`);
				return fetch(url, { method: 'GET' }).then(response => response.json());
		}
}
