getListOfReposAndContributors = async (organization) => {
		const githubAPIService = new GithubAPIService();
		let repositories = await githubAPIService.getListofOrganizationRepositories(organization);

		repositories = repositories.map(async (repo, index) => {
				let result = {
						name: repo.name,
						ownerLogin: repo.owner.login
				};

				if (index < 3) {
						result = {
								...result,
								contributors: await githubAPIService.getContributors(result.ownerLogin, result.name)
						};
				}

				return result;
		});

		Promise.all(repositories).then((data) => {
				$('#json-container').jsonPresenter({
						json: data,
						expand: 2
				})
		});
};
