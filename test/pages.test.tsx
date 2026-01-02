import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

describe('Page Routes Tests', () => {
  describe('Homepage (/) - Requirements 2.1, 4.1', () => {
    it('should render homepage with identical design elements', async () => {
      const HomePage = (await import('../app/page')).default
      
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Verify hero section loads
      expect(screen.getByText(/Learn Azure/i)).toBeInTheDocument()
      
      // Verify main sections are present
      expect(screen.getByText(/Popular Courses/i)).toBeInTheDocument()
      expect(screen.getByText(/Certifications/i)).toBeInTheDocument()
      expect(screen.getByText(/Skills Program/i)).toBeInTheDocument()
      expect(screen.getByText(/Search Fundamentals/i)).toBeInTheDocument()
    })

    it('should have proper page structure and layout', async () => {
      const HomePage = (await import('../app/page')).default
      
      const { container } = render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Verify main container structure
      const mainElement = container.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      
      // Verify sections are properly structured
      expect(container.querySelectorAll('section')).toHaveLength(4)
    })
  })

  describe('Course Detail Page (/courses/[slug]) - Requirements 2.5, 4.1', () => {
    it('should render course detail page structure', async () => {
      const CourseDetailPage = (await import('../app/courses/[slug]/page')).default
      
      render(
        <TestWrapper>
          <CourseDetailPage params={{ slug: 'azure-fundamentals' }} />
        </TestWrapper>
      )

      // Verify course detail page renders without errors
      expect(screen.getByText(/Course Details/i)).toBeInTheDocument()
    })

    it('should handle dynamic slug parameter correctly', async () => {
      const CourseDetailPage = (await import('../app/courses/[slug]/page')).default
      
      const testSlug = 'test-course-slug'
      render(
        <TestWrapper>
          <CourseDetailPage params={{ slug: testSlug }} />
        </TestWrapper>
      )

      // Verify the component renders with the provided slug
      expect(screen.getByText(/Course Details/i)).toBeInTheDocument()
    })
  })

  describe('Lesson Player Page (/courses/[slug]/lesson/[[...lessonId]]) - Requirements 2.5, 4.1', () => {
    it('should render lesson player without lesson ID', async () => {
      const LessonPlayerPage = (await import('../app/courses/[slug]/lesson/[[...lessonId]]/page')).default
      
      render(
        <TestWrapper>
          <LessonPlayerPage 
            params={{ 
              slug: 'azure-fundamentals',
              lessonId: undefined 
            }} 
          />
        </TestWrapper>
      )

      // Verify lesson player renders
      expect(screen.getByText(/Lesson Player/i)).toBeInTheDocument()
    })

    it('should render lesson player with specific lesson ID', async () => {
      const LessonPlayerPage = (await import('../app/courses/[slug]/lesson/[[...lessonId]]/page')).default
      
      render(
        <TestWrapper>
          <LessonPlayerPage 
            params={{ 
              slug: 'azure-fundamentals',
              lessonId: ['lesson-1'] 
            }} 
          />
        </TestWrapper>
      )

      // Verify lesson player renders with lesson ID
      expect(screen.getByText(/Lesson Player/i)).toBeInTheDocument()
    })

    it('should handle multiple lesson ID segments', async () => {
      const LessonPlayerPage = (await import('../app/courses/[slug]/lesson/[[...lessonId]]/page')).default
      
      render(
        <TestWrapper>
          <LessonPlayerPage 
            params={{ 
              slug: 'azure-fundamentals',
              lessonId: ['module-1', 'lesson-2'] 
            }} 
          />
        </TestWrapper>
      )

      // Verify lesson player handles multiple segments
      expect(screen.getByText(/Lesson Player/i)).toBeInTheDocument()
    })
  })

  describe('404 Not Found Page - Requirements 4.1', () => {
    it('should render 404 page with proper styling', async () => {
      const NotFoundPage = (await import('../app/not-found')).default
      
      render(
        <TestWrapper>
          <NotFoundPage />
        </TestWrapper>
      )

      // Verify 404 page content
      expect(screen.getByText(/404/i)).toBeInTheDocument()
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
      
      // Verify return home link is present
      const homeLink = screen.getByRole('link', { name: /return home/i })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('should have proper 404 page structure', async () => {
      const NotFoundPage = (await import('../app/not-found')).default
      
      const { container } = render(
        <TestWrapper>
          <NotFoundPage />
        </TestWrapper>
      )

      // Verify page has proper container structure
      expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
      expect(container.querySelector('.flex')).toBeInTheDocument()
    })
  })
})