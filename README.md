#👨‍💻💻 nikkaLearn - E-learning Backend System

**A blazing fast, modern e-learning  backend built with cutting-edge technologies** ⚡

[🚀 Quick Start](#-quick-start) • [🛠️ Deploy](#-deployment) • [💬 Support](#-support--contact)

---

## 🌟 Features


<table>
<tr>
<td width="50%">

### 🔥 Performance
- **Bun Runtime**: Lightning-fast JavaScript runtime
- **Hono Framework**: Ultra-lightweight web framework
- **TypeScript**: Type-safe development experience

</td>
<td width="50%">

### 🛡️ Enterprise Ready
- **Supabase Integration**: Scalable PostgreSQL database
- **Authentication**: Secure user management
- **Real-time Updates**: Live data synchronization

</td>
</tr>
</table>


## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:
- [Bun](https://bun.sh/) (latest version)
- [Git](https://git-scm.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/hakisolos/nikklearn.git
   cd nikklearn
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Database Setup**
   ```bash
   # Initialize Supabase (if using local development)
   supabase init
   supabase start
   
   # Run migrations
   bun run db:migrate
   ```

5. **Start Development Server**
   ```bash
   bun run dev
   ```

🎉 **Success!** Your server is running at `http://localhost:3000`



## 🛠️ Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Database
bun run db:migrate   # Run database migrations
bun run db:seed      # Seed database with sample data
bun run db:reset     # Reset database

# Testing
bun run test         # Run tests
bun run test:watch   # Run tests in watch mode
bun run test:coverage # Run tests with coverage

# Linting & Formatting
bun run lint         # Lint code
bun run format       # Format code
```

### Project Structure

```typescript
// Example API Route Structure
app.get('/api/products', async (c) => {
  const products = await productService.getAllProducts()
  return c.json({
    success: true,
    data: products,
    message: 'Products fetched successfully'
  })
})
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Add your environment variables in Vercel dashboard
   - Update Supabase settings for production

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Set build command: `bun install && bun run build`
3. Set start command: `bun run start`

### Deploy to Render

1. Connect your GitHub repository
2. Set build command: `bun install && bun run build`
3. Set start command: `bun run start`

### Docker Deployment

```dockerfile
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
```

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys
3. Run the SQL schema from `/database/schema.sql`
4. Configure Row Level Security (RLS) policies

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for admin operations | ✅ |
| `JWT_SECRET` | Secret for JWT token signing | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |

## 🧪 Testing

```bash
# Run all tests
bun test

# Run specific test file
bun test tests/products.test.ts

# Run tests with coverage
bun test --coverage
```

## 🤝 Contributing

We love contributions! Here's how to get started:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

### Development Guidelines

- Write TypeScript with proper types
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

## 📊 Performance

<div align="center">

| Metric | Value |
|--------|-------|
| Cold Start | < 50ms |
| Response Time | < 10ms |
| Memory Usage | < 50MB |
| Bundle Size | < 2MB |

</div>

## 🛡️ Security

- ✅ JWT Authentication
- ✅ Rate Limiting
- ✅ CORS Protection
- ✅ Input Validation
- ✅ SQL Injection Prevention
- ✅ Environment Variable Protection

## 📈 Roadmap

- Advanced Search & Filtering
- Real-time Notifications
- Admin Dashboard
- Analytics Integration
- Multi-tenant Support

## 🐛 Troubleshooting

<details>
<summary>Common Issues</summary>

**Issue: Bun installation fails**
```bash
# Solution: Update Bun to latest version
curl -fsSL https://bun.sh/install | bash
```

**Issue: Supabase connection errors**
```bash
# Solution: Check your environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
```

**Issue: Port already in use**
```bash
# Solution: Change port in .env file
PORT=3001
```

</details>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits & Acknowledgments

**Created with ❤️ by [shell-haki](https://github.com/hakisolos)**

### Built With
- [Bun](https://bun.sh/) - The incredibly fast JavaScript runtime
- [Hono](https://hono.dev/) - Ultrafast web framework
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

### Special Thanks
- The Bun team for creating an amazing runtime
- Supabase team for the excellent backend-as-a-service
- The open-source community for inspiration and support

---

## 💬 Support & Contact

### 📞 Get in Touch

- **GitHub**: [https://github.com/hakisolos](https://github.com/hakisolos)
- **Email**: hakixer@gmail.com
- **Discord**: Join our community server
- **Twitter**: @haki_Xer

### 🆘 Need Help?

- 📚 [Documentation](https://github.com/hakisolos/nikklearn/wiki)
- 🐛 [Report Issues](https://github.com/hakisolos/nikklearn/issues)
- 💡 [Feature Requests](https://github.com/hakisolos/nikklearn/discussions)
- 📋 [Project Board](https://github.com/hakisolos/nikklearn/projects)

---

**⭐ If this project helped you, please give it a star! ⭐**

*Made with 💻 and ☕ by the nikkaLearn team*
