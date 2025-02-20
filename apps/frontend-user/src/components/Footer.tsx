export function Footer() {
    return (
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold mb-4">Hashmap.ai</h3>
              <p>Find your next remote opportunity, anywhere in the world.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><a href="/browse-jobs" className="hover:text-primary">Browse Jobs</a></li>
                <li><a href="/browse-projects" className="hover:text-primary">Browse Projects</a></li>
                <li><a href="/create-profile" className="hover:text-primary">Create Profile</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><a href="/post-job" className="hover:text-primary">Post a Job</a></li>
                <li><a href="/post-project" className="hover:text-primary">Post a Project</a></li>
                <li><a href="/browse-freelancers" className="hover:text-primary">Browse Freelancers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-primary">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                <li><a href="/blog" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 Hashmap.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  