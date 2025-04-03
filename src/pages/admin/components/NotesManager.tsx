import { useState } from 'react';
import { X, Plus, Save, Trash2, Search } from 'lucide-react';

type NoteType = 'top' | 'middle' | 'base';

interface NotesManagerProps {
  existingNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  onSaveNotes: (notes: { top: string[]; middle: string[]; base: string[] }) => void;
}

export const NotesManager = ({ existingNotes, onSaveNotes }: NotesManagerProps) => {
  const [notes, setNotes] = useState<{ top: string[]; middle: string[]; base: string[] }>(existingNotes);
  const [selectedType, setSelectedType] = useState<NoteType>('top');
  const [newNote, setNewNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() && !notes[selectedType].includes(newNote.trim())) {
      const updatedNotes = { 
        ...notes,
        [selectedType]: [...notes[selectedType], newNote.trim()]
      };
      setNotes(updatedNotes);
      setNewNote('');
    }
  };

  const handleRemoveNote = (note: string) => {
    const updatedNotes = { 
      ...notes,
      [selectedType]: notes[selectedType].filter(n => n !== note)
    };
    setNotes(updatedNotes);
  };

  const handleNoteTypeChange = (type: NoteType) => {
    setSelectedType(type);
  };

  const filteredNotes = () => {
    if (!searchTerm.trim()) return notes[selectedType];
    
    return notes[selectedType].filter(note => 
      note.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSaveNotes = () => {
    onSaveNotes(notes);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gold-100 text-gold-700 rounded-md hover:bg-gold-200 transition-colors flex items-center gap-2"
      >
        <Plus size={16} /> Notları idarə et
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ətir Notları (Piramida)</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Yeni not əlavə et"
                className="flex-grow px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddNote}
                className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <Plus size={16} /> Əlavə et
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mb-3">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleNoteTypeChange('top')}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedType === 'top'
                      ? 'bg-primary text-white'
                      : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                  }`}
                >
                  Baş Notlar
                </button>
                <button
                  type="button"
                  onClick={() => handleNoteTypeChange('middle')}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedType === 'middle'
                      ? 'bg-primary text-white'
                      : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                  }`}
                >
                  Orta Notlar
                </button>
                <button
                  type="button"
                  onClick={() => handleNoteTypeChange('base')}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedType === 'base'
                      ? 'bg-primary text-white'
                      : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                  }`}
                >
                  Baza Notlar
                </button>
              </div>
              
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Not axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-8 pr-10 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gold-500" size={16} />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500 hover:text-gold-700"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border border-gold-200 rounded-md p-4 mb-3 bg-gold-50/50 max-h-60 overflow-y-auto">
              {filteredNotes().length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredNotes().map((note, index) => (
                    <div key={index} className="flex items-center">
                      <span className="flex-grow text-sm">{note}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNote(note)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gold-500">
                  <p>Axtarışınıza uyğun not tapılmadı</p>
                </div>
              )}
            </div>
            
            <div className="mb-4 bg-gold-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Baş Notlar ({notes.top.length})</h4>
                  <div className="max-h-32 overflow-y-auto text-sm">
                    {notes.top.length > 0 ? (
                      <ul className="space-y-1">
                        {notes.top.map((note, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span>• {note}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gold-500 italic">Not tapılmadı</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Orta Notlar ({notes.middle.length})</h4>
                  <div className="max-h-32 overflow-y-auto text-sm">
                    {notes.middle.length > 0 ? (
                      <ul className="space-y-1">
                        {notes.middle.map((note, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span>• {note}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gold-500 italic">Not tapılmadı</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Baza Notlar ({notes.base.length})</h4>
                  <div className="max-h-32 overflow-y-auto text-sm">
                    {notes.base.length > 0 ? (
                      <ul className="space-y-1">
                        {notes.base.map((note, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span>• {note}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gold-500 italic">Not tapılmadı</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gold-200 text-gold-700 rounded-md hover:bg-gold-50 transition-colors"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save size={16} /> Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 