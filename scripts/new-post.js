#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function createPost() {
  console.log('\n📝 Create a new blog post\n');

  const title = await question('Post title: ');
  if (!title.trim()) {
    console.log('❌ Title is required!');
    rl.close();
    return;
  }

  const description = await question('Description (optional): ');
  const tagsInput = await question('Tags (comma-separated, optional): ');
  const isDraft = await question('Mark as draft? (Y/n): ');

  const date = getCurrentDate();
  const slug = slugify(title);
  const tags = tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  const draft = isDraft.toLowerCase() !== 'n';

  // Create frontmatter
  const frontmatter = [
    '---',
    `title: "${title}"`,
    `date: ${date}`,
    `layout: post.njk`,
    `draft: ${draft}`
  ];

  if (tags.length > 0) {
    frontmatter.push('tags:');
    tags.forEach(tag => {
      frontmatter.push(`  - ${tag}`);
    });
  }

  if (description.trim()) {
    frontmatter.push(`description: "${description}"`);
  }

  frontmatter.push('---');
  frontmatter.push('');
  frontmatter.push('## Introduction');
  frontmatter.push('');
  frontmatter.push('Write your introduction here...');
  frontmatter.push('');
  frontmatter.push('## Main Content');
  frontmatter.push('');
  frontmatter.push('Write your main content here...');
  frontmatter.push('');
  frontmatter.push('## Conclusion');
  frontmatter.push('');
  frontmatter.push('Write your conclusion here...');
  frontmatter.push('');

  const content = frontmatter.join('\n');
  const filename = `${slug}.md`;
  const postsDir = path.join(__dirname, '..', 'src', 'posts');
  const filepath = path.join(postsDir, filename);

  // Check if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`\n❌ Post already exists: ${filename}`);
    rl.close();
    return;
  }

  // Write the file
  fs.writeFileSync(filepath, content, 'utf-8');

  console.log(`\n✅ Post created successfully!`);
  console.log(`📄 File: src/posts/${filename}`);
  console.log(`🏷️  Status: ${draft ? 'DRAFT' : 'PUBLISHED'}`);
  console.log(`\nYou can now edit your post at:\n${filepath}\n`);

  rl.close();
}

createPost().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
