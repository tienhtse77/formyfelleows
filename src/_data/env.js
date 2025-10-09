module.exports = {
  isProduction: process.env.NODE_ENV === 'production' || 
                process.env.VERCEL_ENV === 'production' ||
                process.env.CONTEXT === 'production'
};