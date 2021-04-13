

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.jsx', '.ts']
    }
}