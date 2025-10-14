/**
 * Code quality utilities and checks
 */

export interface CodeQualityReport {
  score: number;
  issues: CodeQualityIssue[];
  suggestions: string[];
  metrics: CodeQualityMetrics;
}

export interface CodeQualityIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  file?: string;
  line?: number;
  column?: number;
}

export interface CodeQualityMetrics {
  complexity: number;
  maintainability: number;
  readability: number;
  performance: number;
  accessibility: number;
}

// TypeScript/JavaScript code quality checks
export class CodeQualityChecker {
  private issues: CodeQualityIssue[] = [];

  // Check for common React patterns
  checkReactPatterns(code: string, fileName: string): CodeQualityIssue[] {
    const issues: CodeQualityIssue[] = [];

    // Check for missing key props in lists
    const listPattern = /\.map\([^)]*=>[^)]*<[^>]*(?!key=)/g;
    if (listPattern.test(code)) {
      issues.push({
        type: 'warning',
        category: 'react',
        message: 'List items should have unique key props',
        severity: 'medium',
        file: fileName,
      });
    }

    // Check for inline functions in JSX
    const inlineFunctionPattern = /onClick=\{.*=>/g;
    if (inlineFunctionPattern.test(code)) {
      issues.push({
        type: 'warning',
        category: 'performance',
        message: 'Avoid inline functions in JSX for better performance',
        severity: 'medium',
        file: fileName,
      });
    }

    // Check for missing dependency arrays in useEffect
    const useEffectPattern = /useEffect\([^,)]*\)(?!\s*,)/g;
    if (useEffectPattern.test(code)) {
      issues.push({
        type: 'warning',
        category: 'react',
        message: 'useEffect should have dependency array',
        severity: 'medium',
        file: fileName,
      });
    }

    // Check for console.log statements
    const consolePattern = /console\.(log|warn|error|info)/g;
    if (consolePattern.test(code)) {
      issues.push({
        type: 'info',
        category: 'cleanup',
        message: 'Remove console statements from production code',
        severity: 'low',
        file: fileName,
      });
    }

    return issues;
  }

  // Check accessibility patterns
  checkAccessibility(code: string, fileName: string): CodeQualityIssue[] {
    const issues: CodeQualityIssue[] = [];

    // Check for missing alt attributes
    const imgPattern = /<img[^>]*(?!alt=)[^>]*>/g;
    if (imgPattern.test(code)) {
      issues.push({
        type: 'error',
        category: 'accessibility',
        message: 'Images should have alt attributes',
        severity: 'high',
        file: fileName,
      });
    }

    // Check for proper heading hierarchy
    const headingPattern = /<h([1-6])[^>]*>/g;
    const headings: number[] = [];
    let match;
    while ((match = headingPattern.exec(code)) !== null) {
      headings.push(parseInt(match[1]));
    }

    for (let i = 1; i < headings.length; i++) {
      if (headings[i] > headings[i - 1] + 1) {
        issues.push({
          type: 'warning',
          category: 'accessibility',
          message: 'Heading hierarchy should not skip levels',
          severity: 'medium',
          file: fileName,
        });
        break;
      }
    }

    // Check for missing ARIA labels
    const interactivePattern = /<(button|input|select|textarea)[^>]*(?!aria-label)[^>]*(?!aria-labelledby)[^>]*>/g;
    if (interactivePattern.test(code)) {
      issues.push({
        type: 'warning',
        category: 'accessibility',
        message: 'Interactive elements should have ARIA labels',
        severity: 'medium',
        file: fileName,
      });
    }

    return issues;
  }

  // Check performance patterns
  checkPerformance(code: string, fileName: string): CodeQualityIssue[] {
    const issues: CodeQualityIssue[] = [];

    // Check for missing React.memo
    const componentPattern = /export\s+(default\s+)?function\s+(\w+)/g;
    const componentName = componentPattern.exec(code)?.[2];
    
    if (componentName && !code.includes('React.memo') && !code.includes('useMemo')) {
      issues.push({
        type: 'info',
        category: 'performance',
        message: 'Consider using React.memo for component optimization',
        severity: 'low',
        file: fileName,
      });
    }

    // Check for large bundle imports
    const importPattern = /import.*from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importPattern.exec(code)) !== null) {
      const importPath = match[1];
      if (importPath.includes('lodash') && !importPath.includes('lodash/')) {
        issues.push({
          type: 'warning',
          category: 'performance',
          message: 'Use specific lodash imports to reduce bundle size',
          severity: 'medium',
          file: fileName,
        });
      }
    }

    return issues;
  }

  // Check security patterns
  checkSecurity(code: string, fileName: string): CodeQualityIssue[] {
    const issues: CodeQualityIssue[] = [];

    // Check for dangerouslySetInnerHTML
    if (code.includes('dangerouslySetInnerHTML')) {
      issues.push({
        type: 'warning',
        category: 'security',
        message: 'Avoid dangerouslySetInnerHTML unless absolutely necessary',
        severity: 'high',
        file: fileName,
      });
    }

    // Check for eval usage
    if (code.includes('eval(')) {
      issues.push({
        type: 'error',
        category: 'security',
        message: 'Never use eval() - it can execute arbitrary code',
        severity: 'critical',
        file: fileName,
      });
    }

    // Check for innerHTML usage
    if (code.includes('.innerHTML')) {
      issues.push({
        type: 'warning',
        category: 'security',
        message: 'Avoid innerHTML - use textContent or React instead',
        severity: 'medium',
        file: fileName,
      });
    }

    return issues;
  }

  // Calculate code complexity
  calculateComplexity(code: string): number {
    let complexity = 1; // Base complexity
    
    // Count control flow statements
    const controlFlowPatterns = [
      /if\s*\(/g,
      /else\s+if/g,
      /for\s*\(/g,
      /while\s*\(/g,
      /switch\s*\(/g,
      /case\s+/g,
      /catch\s*\(/g,
      /\?\s*.*\s*:/g, // Ternary operators
    ];

    controlFlowPatterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    });

    // Count nested levels
    const nestedPattern = /\{/g;
    const openBraces = code.match(nestedPattern)?.length || 0;
    const closedPattern = /\}/g;
    const closedBraces = code.match(closedPattern)?.length || 0;
    
    complexity += Math.abs(openBraces - closedBraces);

    return complexity;
  }

  // Generate comprehensive report
  generateReport(code: string, fileName: string): CodeQualityReport {
    const issues = [
      ...this.checkReactPatterns(code, fileName),
      ...this.checkAccessibility(code, fileName),
      ...this.checkPerformance(code, fileName),
      ...this.checkSecurity(code, fileName),
    ];

    const complexity = this.calculateComplexity(code);
    
    const metrics: CodeQualityMetrics = {
      complexity: Math.min(complexity / 10, 1), // Normalize to 0-1
      maintainability: Math.max(0, 1 - (issues.filter(i => i.severity === 'high' || i.severity === 'critical').length / 10)),
      readability: Math.max(0, 1 - (complexity / 20)),
      performance: Math.max(0, 1 - (issues.filter(i => i.category === 'performance').length / 5)),
      accessibility: Math.max(0, 1 - (issues.filter(i => i.category === 'accessibility').length / 5)),
    };

    const score = Object.values(metrics).reduce((sum, metric) => sum + metric, 0) / Object.keys(metrics).length;

    const suggestions = this.generateSuggestions(issues, metrics);

    return {
      score: Math.round(score * 100),
      issues,
      suggestions,
      metrics,
    };
  }

  private generateSuggestions(issues: CodeQualityIssue[], metrics: CodeQualityMetrics): string[] {
    const suggestions: string[] = [];

    if (metrics.accessibility < 0.8) {
      suggestions.push('Improve accessibility by adding ARIA labels and proper semantic HTML');
    }

    if (metrics.performance < 0.8) {
      suggestions.push('Optimize performance by using React.memo, useMemo, and specific imports');
    }

    if (metrics.maintainability < 0.8) {
      suggestions.push('Reduce code complexity and fix high-severity issues');
    }

    if (metrics.readability < 0.8) {
      suggestions.push('Simplify complex code and add better documentation');
    }

    const criticalIssues = issues.filter(i => i.severity === 'critical');
    if (criticalIssues.length > 0) {
      suggestions.push('Address critical security and functionality issues immediately');
    }

    return suggestions;
  }
}

// Utility functions for code quality
export const codeQualityUtils = {
  // Format code quality report
  formatReport: (report: CodeQualityReport): string => {
    const { score, issues, suggestions, metrics } = report;
    
    let output = `Code Quality Score: ${score}/100\n\n`;
    
    output += `Metrics:\n`;
    output += `- Complexity: ${Math.round(metrics.complexity * 100)}%\n`;
    output += `- Maintainability: ${Math.round(metrics.maintainability * 100)}%\n`;
    output += `- Readability: ${Math.round(metrics.readability * 100)}%\n`;
    output += `- Performance: ${Math.round(metrics.performance * 100)}%\n`;
    output += `- Accessibility: ${Math.round(metrics.accessibility * 100)}%\n\n`;
    
    if (issues.length > 0) {
      output += `Issues Found (${issues.length}):\n`;
      issues.forEach(issue => {
        output += `- [${issue.severity.toUpperCase()}] ${issue.message} (${issue.category})\n`;
      });
      output += '\n';
    }
    
    if (suggestions.length > 0) {
      output += `Suggestions:\n`;
      suggestions.forEach(suggestion => {
        output += `- ${suggestion}\n`;
      });
    }
    
    return output;
  },

  // Check if code meets quality standards
  meetsStandards: (report: CodeQualityReport): boolean => {
    return report.score >= 80 && 
           report.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length === 0;
  },

  // Get quality grade
  getGrade: (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  },
};

// Export the main checker class
export const codeQualityChecker = new CodeQualityChecker();
