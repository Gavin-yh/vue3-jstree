module.exports = {
  git: {
    tagName: "v${version}",
    commitMessage: "release: v${version}",
    requireCleanWorkingDir: false,
    requireBranch: "master",
    commit: true,
  },
  github: {
    release: true,
    releaseName: `Release ${version}`,
  },
  npm: {
    publish: true,
  },
};
