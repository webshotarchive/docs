---
sidebar_position: 10
title: Troubleshooting
---

# Troubleshooting Guide

Common issues and their solutions when using Webshot Archive.

## Authentication Issues

### "Invalid client credentials" or "Authentication failed"

**Symptoms:**

- GitHub Action fails with authentication errors
- API calls return 401 Unauthorized

**Solutions:**

1. **Check secret names:**

   ```yaml
   # Make sure these match exactly in your workflow
   clientId: ${{ secrets.WSA_CLIENT_ID }}
   clientSecret: ${{ secrets.WSA_CLIENT_SECRET }}
   ```

2. **Verify secret values:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Check that the secrets exist and have the correct values
   - Ensure no extra spaces or characters were copied

3. **Regenerate credentials:**
   - Go to [Account Settings](https://www.webshotarchive.com/account/team)
   - Find your service account
   - Click "View / Add Credentials" → "Create Credentials"
   - Update your GitHub secrets with the new values

4. **Check project ID:**
   - Verify your `projectId` secret matches your actual project ID
   - Find your project ID in the Webshot Archive dashboard

### "Project not found" or "Access denied"

**Solutions:**

1. **Verify project ownership:**
   - Ensure you're using the correct project ID
   - Check that your service account has access to the project

2. **Check project status:**
   - Verify your project is active and not suspended
   - Check your account status and usage limits

## Screenshot Issues

### "Screenshots folder not found"

**Symptoms:**

- GitHub Action fails with "No screenshots found"
- Empty or missing screenshot files

**Solutions:**

1. **Check folder path:**

   ```yaml
   # Make sure this path exists and contains screenshots
   screenshotsFolder: cypress/screenshots
   ```

2. **Verify screenshot generation:**

   ```bash
   # Test locally first
   pnpm cypress run
   ls -la cypress/screenshots/
   ```

3. **Common paths by framework:**
   - **Cypress**: `cypress/screenshots/`
   - **Playwright**: `test-results/` or custom path
   - **Selenium**: `screenshots/`

4. **Check file permissions:**
   - Ensure the GitHub Action can read the screenshots folder
   - Verify files are not empty (0 bytes)

### "Screenshots are empty or corrupted"

**Solutions:**

1. **Wait for page load:**

   ```javascript
   // Add wait time for dynamic content
   cy.wait(2000); // Wait 2 seconds
   cy.screenshot('page-name');
   ```

2. **Check viewport size:**

   ```javascript
   // Set consistent viewport
   cy.viewport(1280, 720);
   cy.screenshot('page-name');
   ```

3. **Handle animations:**

   ```javascript
   // Wait for animations to complete
   cy.get('.loading-spinner').should('not.exist');
   cy.screenshot('page-name');
   ```

4. **Check for errors:**
   - Look for JavaScript errors in the browser console
   - Ensure the page is fully rendered before taking screenshots

## Comparison Issues

### "No diffs shown" or "No comparison made"

**Symptoms:**

- First run shows no visual differences
- Subsequent runs don't compare properly

**Solutions:**

1. **First run behavior:**
   - The first screenshot has nothing to compare against
   - This is normal - make a visual change and create another PR

2. **Check commit SHA:**

   ```yaml
   # Ensure these are set correctly
   commitSha: ${{ github.event.pull_request.head.sha }}
   compareCommitSha: ${{ github.event.pull_request.base.sha }}
   ```

3. **Verify branch comparison:**
   - Ensure you're comparing against the correct base branch
   - Check that the base branch has previous screenshots

### "Unexpected diffs" or "False positives"

**Solutions:**

1. **Adjust diff threshold:**

   ```yaml
   # Add to your workflow for more tolerance
   diffThreshold: 0.1 # 10% tolerance
   ```

   This can also be adjust on a per project basis in project settings on [www.webshotarchive.com](https://www.webshotarchive.com)

2. **Exclude dynamic content:**

   ```javascript
   // Hide elements that change frequently
   cy.get('.timestamp').invoke('hide');
   cy.screenshot('page-name');
   ```

3. **Use consistent data:**
   - Mock API responses for consistent content
   - Use fixed dates and times in tests

## GitHub Actions Issues

### "Workflow not triggering"

**Solutions:**

1. **Check trigger configuration:**

   ```yaml
   on:
     pull_request:
       branches: [main, develop] # Specify branches
     push:
       branches: [main]
   ```

2. **Verify file path:**
   - Ensure the workflow file is in `.github/workflows/`
   - Check the file extension is `.yml` or `.yaml`

3. **Check permissions:**
   ```yaml
   permissions:
     contents: read
     pull-requests: write
     issues: write # If commenting on issues
   ```

### "Action times out" or "Build fails"

**Solutions:**

1. **Increase timeout:**

   ```yaml
   - name: Run tests
     timeout-minutes: 30
     run: pnpm cypress:run
   ```

2. **Optimize build:**

   ```yaml
   - name: Cache dependencies
     uses: actions/cache@v3
     with:
       path: |
         node_modules
         ~/.pnpm-store
       key: ${{ runner.os }}-deps-${{ hashFiles('**/pnpm-lock.yaml') }}
   ```

3. **Use continue-on-error:**
   ```yaml
   - name: Run tests
     run: pnpm cypress:run
     continue-on-error: true
   ```

## Performance Issues

### "Slow screenshot capture"

**Solutions:**

1. **Optimize test setup:**

   ```javascript
   // Use beforeEach for common setup
   beforeEach(() => {
     cy.visit('/');
     cy.wait(1000);
   });
   ```

2. **Reduce viewport size:**

   ```javascript
   // Smaller viewports = faster screenshots
   cy.viewport(1024, 768);
   ```

3. **Use headless mode:**
   ```yaml
   - name: Run tests
     run: pnpm cypress run --headless
   ```

### "Large file uploads"

**Solutions:**

1. **Compress screenshots:**

   ```javascript
   // Use PNG compression
   cy.screenshot('page-name', {
     compressionLevel: 6,
   });
   ```

2. **Reduce image quality:**
   ```javascript
   // For Playwright
   await page.screenshot({
     path: 'screenshot.png',
     quality: 80, // JPEG quality
   });
   ```

## API Issues

### "Rate limit exceeded"

**Solutions:**

1. **Check usage limits:**
   - Visit your [account dashboard](https://www.webshotarchive.com/account)
   - Review your current usage vs. limits

2. **Optimize upload frequency:**
   - Only upload on significant changes
   - Use conditional uploads based on file changes

3. **Upgrade plan:**
   - Consider upgrading for higher limits
   - Contact support for custom limits

### "Network errors" or "Upload failed"

**Solutions:**

1. **Retry logic:**

   ```yaml
   - name: Upload with retry
     uses: webshotarchive/github-action@v1.1.1
     with:
       screenshotsFolder: cypress/screenshots
       # ... other config
     continue-on-error: true
   ```

2. **Check network connectivity:**
   - Verify GitHub Actions can reach external APIs
   - Check for firewall or proxy issues

3. **Use different action version:**
   ```yaml
   uses: webshotarchive/github-action@v1.1.1 # Try latest version
   ```

## Debugging Tips

### Enable debug logging

```yaml
- name: Upload with debug
  uses: webshotarchive/github-action@v1.1.1
  env:
    ACTIONS_STEP_DEBUG: true # Enable debug output
  with:
    # ... your config
```

### Check action logs

1. Go to your GitHub repository → Actions
2. Click on the failed workflow run
3. Expand the "Upload to Webshot Archive" step
4. Look for error messages and debug output

### Test locally first

```bash
# Test your setup locally before pushing
pnpm cypress run
ls -la cypress/screenshots/
```

## Getting Help

If you're still having issues:

1. **Check the logs:** Enable debug mode and review the output
2. **Search existing issues:** [GitHub Issues](https://github.com/webshotarchive/webshotarchive/issues)
3. **Join Discord:** [Community Discord](https://discord.gg/qx5fkzBV)
4. **Contact support:** Email support@webshotarchive.com

### When reporting issues

Include:

- Your workflow configuration (with secrets redacted)
- Error messages and logs
- Steps to reproduce
- Expected vs. actual behavior
- Your testing framework and version
