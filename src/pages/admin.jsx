import AddMovieForm from "../components/addMovieForm.jsx";

export default function AdminPage() {
    return (
      <>
        <div className="min-h-screen bg-black text-white p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-300">Movie Catalog Management</p>
            </header>

            <main>
              <AddMovieForm />
            </main>
          </div>
        </div>
      </>
    );
}