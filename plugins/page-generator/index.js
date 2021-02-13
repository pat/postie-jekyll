module.exports = {
  async onPreBuild({ utils: { run } }) {
    await run.command('bundle exec rake build_pages')
  },
}
