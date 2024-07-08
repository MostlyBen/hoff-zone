module.exports =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const extension = pluginOptions.extension || /\.mdx$/;

    const loader = {
          loader: require.resolve("@mdx-js/loader"),
          options: {
            providerImportSource: "next-mdx-import-source-file",
            ...pluginOptions.options,
          },
        };

    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        config.resolve.alias["next-mdx-import-source-file"] = [
          "private-next-root-dir/src/mdx-components",
          "private-next-root-dir/mdx-components",
          "@mdx-js/react",
        ];

        const mdx = [
          nextConfig?.experimental?.mdxRs ? undefined : options.defaultLoaders.babel,
          loader,
        ].filter(Boolean);

        config.module.rules.push({
          test: extension,
          use: mdx,
        });

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };
