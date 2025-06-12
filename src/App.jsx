import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Calendar, Clock, MessageSquare, Volume2, VolumeX, Upload, Trash2 } from 'lucide-react'
import './App.css'

function App() {
  // Estados para o carrossel de fotos
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  ])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Estados para data/hora
  const [currentTime, setCurrentTime] = useState(new Date())

  // Estados para assistente de voz
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [lastAnnouncementTime, setLastAnnouncementTime] = useState(null)

  // Estados para agendamento
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [scheduledReminders, setScheduledReminders] = useState([])
  const [newReminder, setNewReminder] = useState({
    time: '',
    date: '',
    message: ''
  })

  // Referência para upload de arquivos
  const fileInputRef = useRef(null)

  // Efeito para atualizar o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Efeito para trocar fotos automaticamente a cada 10 segundos
  useEffect(() => {
    const photoTimer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000)

    return () => clearInterval(photoTimer)
  }, [photos.length])

  // Efeito para anúncios de voz a cada 30 minutos
  useEffect(() => {
    const checkAnnouncement = () => {
      const now = new Date()
      const minutes = now.getMinutes()
      
      // Anunciar a cada 30 minutos (00 e 30)
      if ((minutes === 0 || minutes === 30) && now.getSeconds() === 0) {
        const currentTimeKey = `${now.getHours()}:${minutes.toString().padStart(2, '0')}`
        
        if (lastAnnouncementTime !== currentTimeKey && isVoiceEnabled) {
          announceTime()
          setLastAnnouncementTime(currentTimeKey)
        }
      }
    }

    const timer = setInterval(checkAnnouncement, 1000)
    return () => clearInterval(timer)
  }, [lastAnnouncementTime, isVoiceEnabled])

  // Efeito para verificar lembretes agendados
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      
      scheduledReminders.forEach((reminder, index) => {
        const reminderDateTime = `${reminder.date}T${reminder.time}`
        
        if (reminderDateTime === currentDateTime && isVoiceEnabled) {
          speakText(`Lembrete: ${reminder.message}`)
          // Remove o lembrete após ser executado
          setScheduledReminders(prev => prev.filter((_, i) => i !== index))
        }
      })
    }

    const timer = setInterval(checkReminders, 60000) // Verifica a cada minuto
    return () => clearInterval(timer)
  }, [scheduledReminders, isVoiceEnabled])

  // Função para síntese de voz
  const speakText = (text) => {
    if ('speechSynthesis' in window && isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-BR'
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  // Função para anunciar a hora
  const announceTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    
    let timeText = `São ${hours} horas`
    if (minutes > 0) {
      timeText += ` e ${minutes} minutos`
    }
    
    speakText(timeText)
  }

  // Função para formatar data
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Função para formatar hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Função para adicionar foto
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files)
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotos(prev => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  // Função para remover foto
  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    if (currentPhotoIndex >= photos.length - 1) {
      setCurrentPhotoIndex(0)
    }
  }

  // Função para adicionar lembrete
  const addReminder = () => {
    if (newReminder.time && newReminder.date && newReminder.message) {
      setScheduledReminders(prev => [...prev, { ...newReminder }])
      setNewReminder({ time: '', date: '', message: '' })
      setIsScheduleDialogOpen(false)
      speakText('Lembrete agendado com sucesso')
    }
  }

  // Função para remover lembrete
  const removeReminder = (index) => {
    setScheduledReminders(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header com controles */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="bg-black/50 border-white/20 text-white hover:bg-black/70"
          >
            <Upload className="w-4 h-4 mr-2" />
            Adicionar Fotos
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className="bg-black/50 border-white/20 text-white hover:bg-black/70"
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>

          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Agendar Recado
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-600 text-white">
              <DialogHeader>
                <DialogTitle>Agendar Lembrete</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={newReminder.message}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Digite sua mensagem de lembrete..."
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <Button onClick={addReminder} className="w-full">
                  Agendar Lembrete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Área principal com carrossel */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          {photos.length > 0 && (
            <>
              <img
                src={photos[currentPhotoIndex]}
                alt={`Foto ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
              
              {/* Overlay com informações da foto */}
              <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-2 text-white text-sm">
                {currentPhotoIndex + 1} de {photos.length}
              </div>

              {/* Botão para remover foto atual */}
              {photos.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removePhoto(currentPhotoIndex)}
                  className="absolute bottom-4 right-4 bg-red-500/80 border-red-400 text-white hover:bg-red-600/80"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer com relógio e informações */}
      <div className="p-6">
        <Card className="bg-black/30 border-white/20 backdrop-blur-sm">
          <div className="p-6 text-center text-white">
            <div className="text-6xl font-mono font-bold mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-xl mb-4 capitalize">
              {formatDate(currentTime)}
            </div>
            
            {/* Lista de lembretes agendados */}
            {scheduledReminders.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold mb-2">Próximos Lembretes:</h3>
                {scheduledReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                    <div className="text-left">
                      <div className="font-medium">{reminder.message}</div>
                      <div className="text-sm text-slate-300">
                        {new Date(reminder.date).toLocaleDateString('pt-BR')} às {reminder.time}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeReminder(index)}
                      className="bg-red-500/20 border-red-400 text-red-300 hover:bg-red-500/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App

